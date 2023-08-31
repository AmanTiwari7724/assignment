import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, CircularProgress, Modal } from "@mui/material";
import InputField from "../Common/Input";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fcfcfc",
    boxShadow: 24,
};

const Button = (props: any) => {
    return (
        <button
            className="p-3 w-full px-10 text-base font-sans text-white capitalize rounded bg-blue-400"
            onClick={props.onClick}>
            <div className="flex flex-col">
                {props.children}
            </div>
        </button>
    )
}


const AddTaskModal = ({ open, params, handleChange, handleClose, handleSubmit }: any) => {

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEnforceFocus
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                className="font-outFitRegular"
            >
                <Box
                    sx={style}
                    style={{
                        textAlign: "center",
                        borderRadius: "8px",
                        outline: "none",
                    }}
                >
                    <div className="flex flex-col gap-3  lg:w-[496px] w-[320px]">

                        <div className="flex items-center justify-between p-5">
                            <h1 className="font-sans text-lg font-medium">Add New Task</h1>
                            <div
                                onClick={handleClose}
                                className=" cursor-pointer"
                            >
                                {closeicon}
                            </div></div>

                        <div className="flex flex-col gap-4 px-5 pb-5">

                            <InputField
                                name="name"
                                value={params.name}
                                handleChange={handleChange}
                                placeholder="Enter Task"
                            />

                            <InputField
                                name="description"
                                value={params.description}
                                handleChange={handleChange}
                                placeholder="Enter Discription"
                            />


                            <Button onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>


                    </div>
                </Box>
            </Modal>

        </>
    );
};

export default AddTaskModal;

const closeicon = (
    <svg
        width="32"
        height="31"
        viewBox="0 0 32 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M19.7905 11.917L12.2031 19.3674"
            stroke="#222222"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M19.789 19.3722L12.1953 11.9141"
            stroke="#222222"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.8596 1.27539H9.13365C4.3504 1.27539 1.35156 4.60101 1.35156 9.30724V22.0065C1.35156 26.7127 4.33615 30.0383 9.13365 30.0383H22.858C27.6571 30.0383 30.6432 26.7127 30.6432 22.0065V9.30724C30.6432 4.60101 27.6571 1.27539 22.8596 1.27539Z"
            stroke="#222222"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);