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
const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;
class Main extends Component {
    state = {
        url: [],
        text: false,
        test: null,
        id: []
    }

    deletePost = (id, imgName, key) => {
        this.setState({ id: [...this.state.id, key] });

        this.props.onDeletePost(id, imgName, key);
    }
    updatePostData=(author, country, region,year,key)=>{
        console.log('in updatePost ',author);
        this.props.onUpdatePostData(author, country, region,year,key); 
        this.props.onAddNewPost(); 
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
                    return <ImagesBlock
                        close={this.state.id.includes(res.key)? 'Close' : null}
                        key={index}
                        url={res.url}
                        architects={res.author}
                        locationCountry={res.country}
                        locationRegion={res.region}
                        year={res.year}
                        clicked={() => this.deletePost(res.id, res.imgName, res.key)}
                        clickedUpdate={() => this.updatePostData(
                            res.author,
                            res.country,
                            res.region,
                            res.year,
                            res.key
                        )}
                    />
                });
            }
        } else { return null };

        return ImgBlock;
    }
    render() {
        console.log(this.state.id)
        return (

            <div className={classes.Main} >

                <Button
                    btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                    clicked={this.props.onAddNewPost} />
                {this.props.addNewPostContainer && !this.props.loading ? <NewPost /> : null}
                {this.props.addNewPostContainer ? <Backdrop
                    show={this.props.addNewPostContainer}
                    clicked={this.props.onAddNewPost} /> : null}
                <Suspense fallback={<div>loading</div>}>
                    {this.onLoadContent()}
                </Suspense>

            </div >
        );
    };
};


const mapStateToProps = state => {
    return {
        postContent: state.main.postContent,
        loadingNewPost: state.newpost.loading,
        addNewPostContainer: state.newpost.addNewPostContainer,
        loadingContent: state.main.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchContent: () => dispatch(actions.fetchMainContent()),
        onFetchPostContent: () => dispatch(actions.fetchPostContent()),
        onDeletePost: (id, imgName, key) => dispatch(actions.deletePost(id, imgName, key)),
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onUpdatePostData:(author, country, region,year,key)=>dispatch(actions.updatePostData(author, country, region,year,key))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);