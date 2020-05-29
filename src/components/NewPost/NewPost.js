import React, { Component } from 'react';
import axios from '../../axios-orders';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import classes from './NewPost.css';
import ImagesBlock from '../ImagesBlock/ImagesBlock';

import firebase from '@firebase/app';
//                                                                                   
import '@firebase/auth';
import '@firebase/storage';


class NewPost extends Component {
    state = {
        title: '',
        content: '',
        country: '',
        region: '',
        author: 'Cichocka',

    }

    componentDidMount() {

    }
    postDataHandler = () => {
        // const data = {
        //     title: this.state.title,
        //     content: this.state.content,
        //     country: this.state.country,
        //     region: this.state.region,
        //     author: this.state.author
        // };
        // axios.post('/newposts.json', data)
        //     .then(response => {
        //         console.log(response);
        //     });


        firebase.initializeApp(firebaseConfig);
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imagesRef = storageRef.child('images');
        // storage.getDownloadURL().then(res => {
        //     console.log(res);
        // });
        let i = [];
        imagesRef.listAll().then(res => {
            let key = 0;
            res.items.forEach(f => {
                // All the items under listRef.
                storage
                    .ref(`${f.fullPath}`)
                    .getDownloadURL()
                    .then(url => {
                        console.log("Got download url: ", url);
                        // <ImagesBlock url={url} />
                    });

                i.push(f.fullPath);
                console.log(f.fullPath)
            });

        });
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
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Cichocka">Cichocka</option>
                    <option value="Manu">Manu</option>
                </select>
                <label>Location</label>
                {/* <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} /> */}
                <CountryDropdown
                    value={this.state.country}
                    onChange={(val) => this.setState({ country: val })} />
                <br />
                <RegionDropdown
                    country={this.state.country}
                    value={this.state.region}
                    onChange={(val) => this.setState({ region: val })} />

                <label>Year</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    {year}
                </select>
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />

                <button onClick={this.postDataHandler}>Add Post</button>
                {/* <CountryDropdown
                    value={country}
                    onChange={(val) => this.selectCountry(val)} />
                <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => this.selectRegion(val)} /> */}
                {this.postDataHandler}
            </div>
        );
    }
}

export default NewPost;