import React from "react";
import styles from "./Upload.module.scss";

import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {UPLOAD_IMAGE} from "../../store/actions";

interface IProps {
    UPLOAD_IMAGE: any,
}
const Upload: React.FC<IProps> = (props) => {


    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    const handleImageChange = (e: any) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        console.log(e.target.files);
        reader.onloadend = () => {
            props.UPLOAD_IMAGE(file, reader.result);
        };

        reader.readAsDataURL(file)
    };

        return (
            <div className={styles.uploadImages}>
                <input type="file"
                       onChange={(e)=> handleImageChange(e)}
                />
            </div>
        )
};

export default connect((state: IReduxState) => {
    return {
    }
}, (dispatch) => {
    return {
        UPLOAD_IMAGE: (file: string, imagePreviewUrl: string) => dispatch(UPLOAD_IMAGE(file, imagePreviewUrl)),
    }
})(Upload)