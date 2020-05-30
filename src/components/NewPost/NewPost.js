import React, { Component } from 'react';
import axios from '../../axios-orders';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import classes from './NewPost.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ImagesBlock from '../ImagesBlock/ImagesBlock';


// import firebase from '@firebase/app';
// //                                                                                   
// import '@firebase/auth';
// import '@firebase/storage';


class NewPost extends Component {
    state = {
        fillContent: {
            title: '',
            content: '',
            country: '',
            region: '',
            author: 'Cichocka'
        }
    }

    componentDidMount() {

    }
    postDataHandler = () => {


        // const firebaseConfig = {
        //     apiKey: "AIzaSyBot6sPtRy9jVw92sVBevsTiL0vHCJzReg",
        //     authDomain: "cichocka-c6fc5.firebaseapp.com",
        //     databaseURL: "https://cichocka-c6fc5.firebaseio.com",
        //     projectId: "cichocka-c6fc5",
        //     storageBucket: "cichocka-c6fc5.appspot.com",
        //     messagingSenderId: "874982592562",
        //     appId: "1:874982592562:web:45166de12b61cc2323ec2b",
        //     measurementId: "G-1458J9ZZ5P"
        // };
        // firebase.initializeApp(firebaseConfig);
        // const storage = firebase.storage();
        // const storageRef = storage.ref();
        // const imagesRef = storageRef.child('images');
        // // storage.getDownloadURL().then(res => {
        // //     console.log(res);
        // // });
        // let i = [];
        // imagesRef.listAll().then(res => {
        //     let key = 0;
        //     res.items.forEach(f => {
        //         // All the items under listRef.
        //         storage
        //             .ref(`${f.fullPath}`)
        //             .getDownloadURL()
        //             .then(url => {
        //                 console.log("Got download url: ", url);
        //                 // <ImagesBlock url={url} />
        //             });

        //         i.push(f.fullPath);
        //         console.log(f.fullPath)
        //     });

        // });
    }


    render() {
        let year = [];
        for (let i = 1960; i <= 2060; i++) {
            year.push(<option value={i}>{i}</option>);
        }
        return (
            <div className={classes.NewPost}>

                <h1>Add a Post</h1>
                <label>Architects</label>
                <select value={this.state.fillContent.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Cichocka">Cichocka</option>
                    <option value="Manu">Manu</option>
                </select>
                <label>Location</label>
                {/* <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} /> */}
                <CountryDropdown
                    value={this.state.fillContent.country}
                    onChange={(val) => this.setState({ country: val })} />
                <br />
                <RegionDropdown
                    country={this.state.fillContent.country}
                    value={this.state.fillContent.region}
                    onChange={(val) => this.setState({ region: val })} />

                <label>Year</label>
                <select value={this.state.fillContent.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    {year}
                </select>
                <label>Content</label>
                <textarea rows="4" value={this.state.fillContent.content} onChange={(event) => this.setState({ content: event.target.value })} />

                <button onClick={this.props.onFetchNewPost}>Add Post</button>
                {/* <CountryDropdown
                    value={country}
                    onChange={(val) => this.selectCountry(val)} />
                <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => this.selectRegion(val)} /> */}
                {/* {this.postDataHandler} */}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNewPost: () => dispatch(actions.addNewpost())
    };
};
export default connect(null, mapDispatchToProps)(NewPost);