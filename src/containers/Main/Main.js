import React, { Suspense, Component } from 'react';
import classes from './Main.css';
import { connect } from 'react-redux';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';

import Button from '../../components/UI/Button/Button';
import NewPost from '../NewPost/NewPost';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import * as actions from '../../store/actions/index';

import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import asyncAuth from '../../components/ImagesBlock/ImagesBlockContent/ImagesBlockContent';

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;

const postGalery = asyncComponent(() => {
    return import('../../components/ImagesBlock/ImagesBlockContent/ImagesBlockContent');

});
const newsMedia = asyncComponent(() => {
    return import('../NewsMedia/NewsMedia');

});
class Main extends Component {
    state = {
        url: [],
        text: false,
        test: null,
        id: [],
        folderName: 'newposts'
    }

    deletePost = (id, imgName, key) => {
        this.setState({ id: [...this.state.id, key] });

        this.props.onDeletePost(id, imgName, key, this.state.folderName);
    }
    updatePostData = (postData) => {
        this.props.onUpdatePostData(postData);
        this.props.onAddNewPost();
    }
    postSelectedHandler = (id, urlArray) => {
        this.props.history.push({ pathname: id });
        // console.log("urlArray ", urlArray)
        this.props.onUrlArray(urlArray);
    }
    onLoadContent = () => {
        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={this.state.waitLoader}
        />;
        if (this.props.postContent !== null) {
            if (this.props.postContent.length !== 0) {
                ImgBlock = this.props.postContent.map((res, index) => {

                    console.log('split ', res.url.split(","))
                    return <ImagesBlock
                        auth={true}
                        close={this.state.id.includes(res.key) ? 'Close' : null}
                        key={index}
                        url={res.url}
                        page="Main"
                        architecture={res.architecture}
                        photographs={res.photographs}
                        locationCountry={res.location}
                        year={res.year}
                        id={res.key}
                        imageName={res.imgName}
                        clicked={() => this.deletePost(res.id, res.imgName, res.key)}
                        clickedUpdate={() => this.updatePostData(res)}
                        clickedOn={() => this.postSelectedHandler(res.key, res.url.split(","))}
                    />
                });
                console.log(ImgBlock);
            }
        } else { return null };

        return ImgBlock;
    }
    closeHandler = () => {
        this.props.onAddNewPost();
        this.props.updateHandler ? this.props.onUpdatePostData() : null;
    }
    render() {
        console.log(this.state.id)
        return (

            <div className={classes.Main} >

                <Button
                    btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                    clicked={this.props.onAddNewPost} />
                {this.props.addNewPostContainer && !this.props.loading ? <NewPost
                    folderName={this.state.folderName}
                /> : null}
                {this.props.addNewPostContainer ? <Backdrop
                    show={this.props.addNewPostContainer}
                    clicked={this.closeHandler} /> : null}
                <Suspense fallback={<div>loading</div>}>
                    {this.onLoadContent()}
                </Suspense>
                <Switch>
                    {/* <Route path={'/prasa'} exact component={newsMedia} /> */}
                    <Route path={'/:id'} component={postGalery} />
                    <Route path={'/:id'} component={postGalery} />
                    {/* <Redirect to="/" /> */}
                </Switch>

            </div >
        );
    };
};


const mapStateToProps = state => {
    return {
        postContent: state.main.postContent,
        loadingNewPost: state.newpost.loading,
        addNewPostContainer: state.newpost.addNewPostContainer,
        loadingContent: state.main.loading,
        updateHandler: state.newpost.updateHandler

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchContent: () => dispatch(actions.fetchMainContent()),
        // onFetchPostContent: () => dispatch(actions.fetchPostContent()),
        onDeletePost: (id, imgName, key, folderName) => dispatch(actions.deletePost(id, imgName, key, folderName)),
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray)),

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));