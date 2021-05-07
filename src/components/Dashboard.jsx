import React from 'react';
import Header from '../template/Header';

import { apiUrl } from '../services/apirest';
import axios from 'axios';

class Dashboard extends React.Component{
    state={
        bookings: [],
        form: {
            "search": ""
        }
    }

    componentDidMount(){        
        let url = apiUrl + "booking/list";
        axios.get(url)
        .then(response => {
            console.log(response.data);
            this.setState({
                bookings: response.data.response
            })
        });
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

    submitSearch = () => {
        let url = apiUrl + "booking/search";
        axios.post(url, this.state.form)
        .then( response => {
            this.setState({
                bookings: response.data.data
            });
        }).catch(error => {
            
        });
    }

    render(){
        return(
            <React.Fragment>
                <Header />
                
                <div className="container mt-5">
                    <div className="row">
                        <form onSubmit={this.formSubmit}>
                            <div className="col-md-12">
                                <input className="form-control" type="search" name="search" placeholder="Firt Name or Last Name" aria-label="Search" onChange={this.inputOnChange} />
                            </div>
                            <div className="col-md-4 mt-3">                                
                                <button className="btn btn-primary" type="submit" onClick={this.submitSearch}>Search</button>
                            </div>
                        </form>
                    </div>

                    <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Fecha Creacion</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.bookings.map((value, index) => {
                            return(
                                <tr key={index}>
                                    <th>{value.bookingId}</th>
                                    <th>{value.firstName} {value.lastName}</th>
                                    <th>{value.bookingTime}</th>
                                    <th>{value.streetAddress}</th>
                                    <th>{value.bookingPrice}</th>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;