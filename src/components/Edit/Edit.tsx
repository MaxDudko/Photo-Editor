import React from "react";
import styles from "./Edit.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {} from "../../store/actions";
import {
    FaRegImages,
    IoMdOptions,
    MdTextFields, FaShapes, FaFonticons, GiTriangleTarget
} from "react-icons/all";
import Common from "./Common";
import Images from "./Images";
import Texts from "./Texts";
import Shapes from "./Shapes";
interface IProps {
}

const Edit: React.FC<IProps> = (props) => {
    let [selected, select] = React.useState("common");
    let [isFilter, filterOpen] = React.useState(false);

    const optionsSelected = () => {
        if (selected === "common") {
            return (
               <Common isFilter={isFilter}
                       filterOpen={filterOpen}
               />
            )
        } else if(selected === "image") {
            return (
                <Images isFilter={isFilter}
                        filterOpen={filterOpen}
                />
            )
        } else if (selected === "text") {
            return (
                <Texts />
            )
        } else if (selected === "shapes") {
            return (
                <Shapes />
            )
        } else if(selected === "") {
            // for (let icon in all) {
            //     <{icon} />
            // }
        } else {
            return null;
        }
    };

    return(
        <div className={styles.edit}>
            <div className={styles.sidebar}>
                <div className={`${styles.item} ${selected === "common" ? styles.selected : ""}`}
                     onClick={() => selected === "common" ? select("") : select("common")}
                >
                    <IoMdOptions />
                </div>
                <div className={`${styles.item} ${selected === "image" ? styles.selected : ""}`}
                     onClick={() => selected === "image" ? select("") : select("image")}
                >
                    <FaRegImages />
                </div>
                <div className={`${styles.item} ${selected === "text" ? styles.selected : ""}`}
                     onClick={() => selected === "text" ? select("") : select("text")}
                >
                    <MdTextFields />
                </div>
                <div className={`${styles.item} ${selected === "shapes" ? styles.selected : ""}`}
                     onClick={() => selected === "shapes" ? select("") : select("shapes")}
                >
                    <GiTriangleTarget />
                </div>
            </div>
            {
                optionsSelected()
            }
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {

    };
}, (dispatch) => {
    return {

    }
})(Edit)