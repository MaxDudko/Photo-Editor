import React from "react";
import styles from "./AddText.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {ADD_TEXT} from "../../store/actions";

interface IProps {
    ADD_TEXT: any,
}

const Edit: React.FC<IProps> = (props) => {
    let [text, change] = React.useState("");

    return(
        <div className={styles.addText}>
            <textarea cols={40} rows={5}
                      placeholder="Add Text..."
                      onChange={(e) => change(e.target.value)}
            >
            </textarea>
            <button onClick={() => props.ADD_TEXT(text)}>Add Text</button>
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
    };
}, (dispatch) => {
    return {
        ADD_TEXT: (text: string) => dispatch(ADD_TEXT(text))
    }
})(Edit)