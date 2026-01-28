import { useLocation } from "react-router-dom"
import UserNavbar from "../../components/UserNavbar"
import { userMenuStore } from "../../zustand/userMenuStore"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaRegFilePdf } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import axios from "axios";
import Markdown from 'react-markdown';

function AnalyzeReport() {

    const location = useLocation();
    const { isOpen } = userMenuStore();
    const [file, setFile] = useState<File | null>(null);
    const [output, setOutput] = useState<string | null>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        }
        else {
            document.body.style.overflowY = 'auto';
        }
    }, [isOpen]);

    const submit = async () => {

        if (loading) {
            return;
        }

        if (!file) {
            toast.error("File required");
            return;
        }

        const formData = new FormData()
        formData.append("file", file)

        const id = toast.loading("Processing...");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/api/user/analyze-report", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });;

            const temp = res.data.text;
            for (const chunk of temp) {
                setTimeout(() => {
                    setOutput(prev => prev + chunk);
                }, 500);
            }

        } catch (err) {
            console.log(err);
        }
        finally {
            toast.dismiss(id);
            setLoading(false);
        }
    }

    function formatFileSize(size: number) {
        if (size === 0) return "0 B"
        const k = 1024
        const sizes = ["B", "KB", "MB", "GB", "TB"]
        const i = Math.floor(Math.log(size) / Math.log(k))
        return `${(size / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
    }

    return (
        <>
            <div className={`w-full bg-linear-to-br from-white via-white to-orange-200 min-h-screen flex flex-col justify-start items-center relative overflow-hidden`}>
                <UserNavbar pathname={location.pathname} />

                <div className={`w-full h-auto flex flex-col justify-start items-center px-5 lg:justify-center gap-3 mt-24 pb-8`}>

                    {/* file select box */}
                    <div className={`w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] ${file ? "hidden" : "block"} group cursor-pointer hover:bg-white duration-200 ease-in-out h-[20vh] md:h-[30vh] bg-gray-100 border-black border-dashed relative overflow-hidden border-2 rounded-2xl flex flex-col justify-center items-center`}>
                        <input onChange={(e) => {
                            const maxSize = 5 * 1024 * 1024
                            if (e.target.files) {
                                const file = e.target.files[0];
                                if (file.size > maxSize) {
                                    toast.error("Size limit exceeded");
                                    return;
                                }

                                if (file.type !== 'application/pdf') {
                                    toast.error("Only PDF files allowed");
                                    return;
                                }

                                setFile(file);
                            }
                        }} type="file" className={`absolute w-full text-6xl h-full opacity-0 cursor-pointer`} />
                        <h1 className={`text-black group-hover:scale-125 duration-200 ease-in-out text-xl font-Telegraf font-semibold opacity-55`}>Upload your report</h1>
                        <p className={`w-auto px-5 py-2 mt-1 rounded-full bg-white opacity-60 text-sm italic`}>Only PDF files allowed</p>
                        <p className={`w-auto px-5 py-2 rounded-full opacity-60 text-sm italic`}>Max size: 5MB</p>
                    </div>

                    {/* analysis output */}
                    <div className={`w-full ${output ? "block" : "hidden"} md:w-[60%] py-3 px-3 h-auto mt-5 lg:mt-0 flex flex-col justify-start items-center`}>
                        <h1 className={`w-full text-center px-3 font-Telegraf text-2xl text-black font-semibold`}>Report Analysis</h1>
                        <div className={`w-full lg:w-[80%] h-px bg-linear-to-r from-white via-black to-white my-2`} />

                        <p className={`w-full text-start font-Telegraf text-black text-sm lg:text-[12px] lg:px-5 px-3 py-3`}>
                            <Markdown>
                                {output}
                            </Markdown>
                        </p>
                    </div>

                    {/* pdf render */}
                    <div className={`w-full ${file ? "block" : "hidden"} md:w-[50%] xl:w-[30%] flex flex-col justify-start items-center px-3 py-4`}>
                        {file && (
                            <iframe
                                src={URL.createObjectURL(file)}
                                width="100%"
                                height="100%"
                                title="PDF Viewer"
                                className={`h-[50vh]`}
                            />
                        )}
                    </div>

                    {/* file info */}
                    <div className={`w-full ${file ? "block" : "hidden"} border-2 border-orange-600 rounded-2xl border-dashed md:w-[50%] lg:w-[30%] flex flex-col justify-start items-center px-3 py-4`}>
                        <p className={`w-full text-center flex justify-center items-center gap-2 text-lg font-semibold text-black`}><FaRegFilePdf className="text-red-500" />{file?.name}</p>
                        <p className={`w-full flex justify-center items-center gap-2 text-sm italic font-semibold text-black`}>{formatFileSize(file?.size || 0)}</p>
                        <p onClick={submit} className={`w-full mt-3 cursor-pointer active:opacity-70 duration-150 ease-in-out active:scale-95 py-2 rounded-md flex justify-center items-center gap-2 font-Telegraf bg-linear-to-b from-orange-300 to-orange-700 text-white`}>Analyze <IoSparklesSharp /></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnalyzeReport
