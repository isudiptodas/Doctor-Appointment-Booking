import express from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { Booking } from '../../models/Booking.js';
import { timeSlots } from '../../data/timeSlot.js';
import { emailQueue } from '../../queues/emailQueue.js';

const router = express.Router();

router.post(`/api/user/check-slot`, authenticate, async (req, res) => {
    const { date, doctorName } = req.body;

    const formatted = new Date(date);
    formatted.setHours(0, 0, 0, 0);
    const MAX = 10;

    const availableSlots = [];

    try {
        for (const slot of timeSlots) {
            const count = await Booking.countDocuments({
                appointmentDate: formatted,
                doctorName,
                timeSlot: slot
            });

            if (count < MAX) {
                availableSlots.push(slot);
            }
        }

        if (availableSlots.length === 0) {
            return res.status(200).json({
                success: true,
                slots: timeSlots
            });
        }

        return res.status(200).json({
            success: true,
            slots: availableSlots
        });


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Something went wrong`
        });
    }
});

router.post(`/api/user/book-appointment`, authenticate, async (req, res) => {
    const { date, doctorName, doctorEmail, timeSlot } = req.body;
    const userData = req.userData;

    const formatted = new Date(date);
    formatted.setHours(0, 0, 0, 0);

    const [day, month, year] = date.split("-");
    const dateObj = new Date(`20${year}`, month - 1, day);

    const session = await Booking.startSession();
    session.startTransaction();

    try {

        const count = await Booking.countDocuments({
            doctorName,
            appointmentDate: formatted,
            timeSlot,
        }, { session }
        );

        if (count >= 10) {
            return res.status(505).json({
                success: false,
                message: `Can't book appointment`
            });
        }

        const newAppointment = new Booking({
            patientName: userData.name,
            patientEmail: userData?.email,
            doctorName,
            doctorEmail,
            appointmentDate: formatted,
            timeSlot
        });

        await newAppointment.save({ session });
        await session.commitTransaction();
        session.endSession();

        await emailQueue.add('appointment-booked', {
            name: userData?.name,
            email: userData?.email,
            doctorName,
            date: dateObj.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }),
            timeSlot
        });

        return res.status(200).json({
            success: true,
            message: `Appointment Booked`
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Something went wrong`
        });
    }
});

export default router;