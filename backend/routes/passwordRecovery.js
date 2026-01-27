import express from 'express';
import { resend } from '../config/resend.js';
import { Doctor } from '../models/Doctor.js';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import { emailQueue } from '../queues/emailQueue.js';

const router = express.Router();

router.post(`/api/check-email`, async (req, res) => {
    const { email, otp, role } = req.body;

    try {
        if (role === 'user') {
            const found = await User.findOne({ email });

            if (!found) {
                return res.status(404).json({
                    success: false,
                    message: `No user found with email`
                });
            }

            const { data, error } = await resend.emails.send({
                from: process.env.RESEND_EMAIL,
                to: [email],
                subject: 'Account Recovery',
                html: `<h1>MediLab</h1> \n <p>Hello ${found.name}</p>\n Here is your OTP
                      for password recovery. <b>${otp}</b>`
            });

            if (error) {
                console.log(error);
                return res.status(400).json({
                    success: false,
                    message: `Failed to send OTP`
                });
            }

            return res.status(200).json({
                success: true,
                message: `OTP sent on email`
            });
        }
        else if (role === 'doctor') {
            const found = await Doctor.findOne({ email });

            if (!found) {
                return res.status(404).json({
                    success: false,
                    message: `No doctor found with email`
                });
            }

            const { data, error } = await resend.emails.send({
                from: process.env.RESEND_EMAIL,
                to: [email],
                subject: 'Account Recovery',
                html: `<h1>MediLab</h1> \n <p>Hello ${found.name}</p>\n Here is your OTP
                      for password recovery. <b>${otp}</b>`
            });

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: `Failed to send OTP`
                });
            }

            return res.status(200).json({
                success: true,
                message: `OTP sent on email`
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong`
        });
    }
});

router.put(`/api/change-password`, async (req, res) => {
    const { password, email, type } = req.body;
    try {
        if (type === 'user') {
            const found = await User.findOne({ email });

            const hashed = await bcrypt.hash(password, 10);

            found.password = hashed;
            await found.save();

            await emailQueue.add('account-recovery', {
                name: found.name, email
            }, {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 1000
                }
            });

            return res.status(200).json({
                success: true,
                message: `Password changed`
            });
        }

        if (type === 'doctor') {
            const found = await Doctor.findOne({ email });

            const hashed = await bcrypt.hash(password, 10);

            found.password = hashed;
            await found.save();

            await emailQueue.add('account-recovery', {
                name: found.name, email
            }, {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 1000
                }
            });

            return res.status(200).json({
                success: true,
                message: `Password changed`
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Something went wrong`
        });
    }
});

export default router;