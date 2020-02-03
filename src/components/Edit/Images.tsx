import React from "react";
import styles from "./Edit.module.scss";
import Upload from "../Upload/Upload";
import {GiSplitCross} from "react-icons/all";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {DELETE_IMAGE, SELECT_IMAGE} from "../../store/actions";

interface IProps {
    isFilter: boolean,
    filterOpen: any,

    images: any,
    selectedImage: number,
    SELECT_IMAGE: any,
    DELETE_IMAGE: any,
}

const Images: React.FC<IProps> = (props) => {
    return (
        <div className={styles.options}>
            <p>Upload Image: </p>
            <Upload />
            <div className={styles.list}>
                {
                    props.images.map((image: any, i: number) => {
                        return (
                            <div className={`${styles.wrapper} ${i === props.selectedImage ? styles.selectedItem : ""}`}
                                 key={i}
                                 onClick={() => props.SELECT_IMAGE(i)}
                            >
                                <img src={image} alt="#" />
                                <div className={styles.delete}>
                                    <GiSplitCross style={{width: "20px", height: "100%", cursor: "pointer"}}
                                                  onClick={() => props.DELETE_IMAGE(i)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
        images: state.styles.images,
        selectedImage: state.styles.selectedImage,
    };
}, (dispatch) => {
    return {
        SELECT_IMAGE: (index: any) => dispatch(SELECT_IMAGE(index)),
        DELETE_IMAGE: (index: any) => dispatch(DELETE_IMAGE(index)),
    }
})(Images)