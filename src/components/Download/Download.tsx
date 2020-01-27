import React from "react";
import styles from "./Download.module.scss";
import htmlToImage from "html-to-image";

interface IProps {
}

const Download: React.FC<IProps> = (props) => {
    const download = () => {
        Array.from(document.getElementsByClassName("rect")).forEach((e: any, i: number) => e.style.display = "none");
        Array.from(document.getElementsByClassName("del")).forEach((e: any, i: number) => e.style.display = "none");
        const node = document.getElementById('NewImage') as HTMLElement;
        htmlToImage.toPng(node)
            .then (function (dataUrl) {
                let img = new Image();
                img.src = dataUrl;
                window.location.href = dataUrl.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
                Array.from(document.getElementsByClassName("rect")).forEach((e: any, i: number) => e.style.display = "");
                Array.from(document.getElementsByClassName("del")).forEach((e: any, i: number) => e.style.display = "");
            })
            .catch(function (error) {
                console.error('Something went wrong!', error);
            });
    };

    return(
        <button className={styles.btn}
                onClick={() => download()}
        >
            Download
        </button>
    )
};

export default Download;