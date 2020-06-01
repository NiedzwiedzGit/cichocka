import React, { Component } from 'react';
import axios from '../../axios-orders';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import classes from './NewPost.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ImagesBlock from '../ImagesBlock/ImagesBlock';


class NewPost extends Component {
    state = {
            title: '',
            content: '',
            country: '',
            region: '',
            author: 'Cichocka'
    }

    componentWilUpdate() {
        console.log('[newPost] '+this.props.loading);
    }
    submitPost = () => {
this.props.onFetchNewPost(
  //  this.state.title,
    this.state.content,
    this.state.country,
    this.state.region,
    this.state.author);
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

                {!this.props.loading?<button onClick={this.submitPost}>Add Post</button>:<label>Loading...</label>}
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

const mapStateToProps=state=>{
    return{
        loading:state.newpost.loading
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchNewPost: (content,country,region,author) => dispatch(actions.addNewPost(content,country,region,author))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);