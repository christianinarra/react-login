import axios from 'axios';
import React from 'react';
import '../assets/css/Login.css';
import logo from '../assets/img/logo.svg';
import { apiUrl } from '../services/apirest';

class Login extends React.Component{

    constructor(props){
        super(props);
    }

    state={
        form:{
            "email":"",
            "password":""
        },
        error:false,
        login:false,
        message:""
    }

    formSubmit(e){
        e.preventDefault();
    }

    inputOnChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    formLoginSubmit = () => {
        let url = apiUrl + "auth/login";
        console.log(this.state.form);
        axios.post(url, this.state.form)
        .then( response => {
            if (response.data.status === "successful"){
                this.setState({
                    login: true,
                    message: response.data.message
                });
                localStorage.setItem("token", response.data.token);
                this.props.history.push("/dashboard");
            }else{
                this.setState({
                    error: true,
                    message: response.data.message
                });
            }
            console.log(response);
        }).catch(error => {
            this.setState({
                error: true,
                message: "Conexion error"
            });
        });
    }

    render(){
        return(
            <React.Fragment>                
                <div className="wrapper mt-5 fadeInDown">
                    <div id="formContent">
                        
                        <div className="fadeIn first">
                            <img src={logo} width="150px" alt="Logo" />
                        </div>

                        <form onSubmit={this.formSubmit}>
                            <input type="text" className="fadeIn second" name="email" placeholder="Username" onChange={this.inputOnChange} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.inputOnChange} />
                            <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.formLoginSubmit} />
                        </form>
                        
                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        }

                        {this.state.login === true &&
                            <div className="alert alert-success" role="alert">
                                {this.state.message}
                            </div>
                        }

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;