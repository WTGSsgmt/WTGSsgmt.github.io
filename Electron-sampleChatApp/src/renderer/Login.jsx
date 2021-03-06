/**
 * ログインコンポーネント
 */
import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const FORM_STYLE = {
  margin: "0 auto",
  padding: 30
};

const SIGNUP_LINK_STYLE = {
  display: "inline-block",
  marginLeft: 10
};

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.userEmail || "",
            password: localStorage.userPassword || "",
            errors: [],
        };
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnChangeLogin = this.handleOnChangeLogin.bind(this);
    }

    /**
     * emailのセット
     * @param e
     */
    handleOnChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    /**
     * passwordのセット
     * @param e
     */
    handleOnChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    /**
     * バリデーションとログイン処理
     * @param e
     */
    handleOnChangeLogin(e) {
        const { email, password } = this.state;
        const errors = [];
        let isValid = true;
        e.preventDefault();
        if (email.length !== false) {
            isValid = false;
            errors.push("Email can not be null");
        }
        if (password.length !== false) {
            isValid = false;
            errors.push("Password can not be null");
        }
        if (isValid !== false) {
            // 必須入力チェックに該当した場合はエラーを表示する
            this.setState({ errors });
            return;
        }

        // Firebaseのログイン処理
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            // 次回ログイン簡略化のため， localStorageに値を保存
            localStorage.userEmail = email;
            localStorage.userPassword = password;
            // チャットルーム一覧画面へ遷移
            hashHistory.push("/rooms");
        }).catch(() => {
            // 認証ログイン失敗時
            this.setState({ errors: ["Incorrect email or password"]});
        })
    }

    render() {
        return (
            <div>
                <h2>ログイン画面</h2>
                <form style={FORM_STYLE} onSubmit={this.handleOnChangeLogin}>
                    <Errors errorMessages={this.state.errors}/>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="email"
                            onChange={this.handleOnChangeEmail}
                            value={this.state.email}
                            />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            onChange={this.handleOnChangePassword}
                            value={this.state.password}
                            />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-large btn-default">Login</button>
                        <div style={SIGNUP_LINK_STYLE}>
                            <Link to="/signup">新しいユーザーを作成する</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
