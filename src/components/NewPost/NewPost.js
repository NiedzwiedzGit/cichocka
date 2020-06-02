import React, { Component } from 'react';
import axios from '../../axios-orders';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import classes from './NewPost.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ImagesBlock from '../ImagesBlock/ImagesBlock';
import Button from '../UI/Button/Button';

import Button2 from 'react-bootstrap/Button';


class NewPost extends Component {
    state = {
        title: '',
        content: '',
        country: '',
        region: '',
        author: '',
        btnMessage: "Success"
    }

    componentWilUpdate() {
        console.log('[newPost] ' + this.props.loading);
    }
    submitPost = () => {
        !this.props.loading && !this.props.animate ? this.props.onFetchNewPost(
            //  this.state.title,
            this.state.content,
            this.state.country,
            this.state.region,
            this.state.author) : null;

        !this.props.loading && this.props.animate ?
            this.setState({
                title: '',
                content: '',
                country: '',
                region: '',
                author: ''
            }) : null;
        this.props.onAnimateSuccesErrorButton();
    }



    render() {
        let year = [];
        for (let i = 1960; i <= 2060; i++) {
            year.push(<option key={i} value={i}>{i}</option>);
        }
        console.log('[this.props.animate] -> ' + this.props.animate);
        let animationButton = null;
        let hidePostForm = "Show";
        if (!this.props.loading && !this.props.animate) {

            animationButton = <Button2
                variant="outline-dark"
                onClick={this.submitPost}>Add Post</Button2>

            if (this.state.btnMessage == "Do it again?") {
                this.setState({ btnMessage: "Success" });
            }
        } else if (!this.props.loading && this.props.animate) {
            hidePostForm = "Hide";
            setTimeout(() => {
                this.setState({ btnMessage: "Do it again?" })
            }, 1000);

            animationButton = <Button2
                variant="success"
                onClick={this.submitPost}>{this.state.btnMessage}</Button2> ,
                <Button
                    btnType="Success"
                />

        } else { animationButton = <label>Loading...</label> }
        return (
            <div className={classes.NewPost}>
                <div className={classes[hidePostForm]}>
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
                </div>
                <Button
                    btnState={hidePostForm + 'PostForm'}
                    btnType="Success"
                />
                <div className={classes.SubmitBtn}>
                    {animationButton}
                </div>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.newpost.loading,
        animate: state.newpost.animate
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchNewPost: (content, country, region, author) => dispatch(actions.addNewPost(content, country, region, author)),
        onAnimateSuccesErrorButton: () => dispatch(actions.animateSuccesErrorButton()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);