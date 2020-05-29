import React, { Component } from 'react';
import classes from './Main.css';
import { connect } from 'react-redux';
import ImagesBlock from './ImagesBlock/ImagesBlock';
// import aaa from '../../assets/images/cichocka.png';
import { cache } from '../../assets/images/index';
// require('../../../public/images');


class Main extends Component {
    componentDidMount() {

    };

    render() {
        const cache = [];
        const urlImg = require.context('../../../public/images', true, /\.png$/);
        let a = null;
        urlImg.keys().map(key => {
            cache.push(String(key.substring(1)))
            a = key.substring(1);
            // console.log('[indexFile] ' + a);
            //console.log('[indexFile] ' + cache[key]);
        });
        const ImgBlock = cache.map(url => {
            return <ImagesBlock url={url} />
            console.log(url);
        });


        // At build-time cache will be populated with all required modules.
        // let x = images.map(res => {
        //     console.log(res);
        // });
        // let image = images.map(img => {
        //     console.log(img);
        // }
        // );
        return (
            <div className={classes.Main} >
                {ImgBlock}
            </div>
        );
    };
};


const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);