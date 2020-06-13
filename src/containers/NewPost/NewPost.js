import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import classes from './NewPost.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import ButtonBootstrap from 'react-bootstrap/Button';
import PropagateLoader from "react-spinners/PropagateLoader";

import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../components/UI/Input/Input'; 

import ImageUploading from "react-images-uploading";

const maxNumber = 100;
const maxMbFileSize = 6 * 1024 * 1024;

class NewPost extends Component {

    state = {
        orderForm: {
            architecture: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Author'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            author: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Photographs'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Location'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            year: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Year'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            // country: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'Country'
            //     },
            //     value: '',
            //     validation: {
            //         required: true
            //     },
            //     valid: false,
            //     touched: false
            // },
            // email: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'email',
            //         placeholder: 'Your E-Mail'
            //     },
            //     value: '',
            //     validation: {
            //         required: true,
            //         isEmail: true
            //     },
            //     valid: false,
            //     touched: false
            // },
            // deliveryMethod: {
            //     elementType: 'select',
            //     elementConfig: {
            //         options:[
            //             { value: 'fastest', displayValue: 'Fastest' },
            //             { value: 'cheapest', displayValue: 'Cheapest' }
            //         ]
            //     },
            //     value: '1960',
            //     validation: {},
            //     valid: true
            // }
        },
        // formIsValid: false,
        // content: '',
        // country: '',
        // region: '',
        // author: '',
        // year: '',
        imgNeme: '',
        btnMessage: "Success",
        imageFile: {},
        checkBox: false,
        checked: {},
        sAuthorMassage: true,
        update:this.props.update
    }

    submitPost = () => {





        // let postKey = new Date().getTime();
        // postKey.toString();
        // // console.log('checking wher is key = ',key);
        // if (!this.props.loading && !this.props.animate) {
        //     this.props.onFetchNewPost(
        //         this.state.content,
        //         this.state.country,
        //         this.state.region,
        //         this.state.author,
        //         this.state.year,
        //         this.state.imageFile,
        //         //this.state.imgNeme,
        //         postKey)
        //     // this.handleFireBaseUpload();
        // } else null;

        // !this.props.loading && this.props.animate ?
        //     this.setState({
        //         content: '',
        //         country: '',
        //         region: '',
        //         author: '',
        //         year: '',
        //         imgNeme: ''
        //     }) : null;
      //  this.props.onAnimateSuccesErrorButton();
    };

    handleImageAsFile = (imageList) => {
        this.setState({ imageFile: imageList })
    };
    handleFireBaseUpload = () => {
        // console.log('start of upload');
        // if (this.state.imageFile === '') {
        //     console.error(`not an image, the image file is a ${typeof (imageFile)}`)
        // }

        // Array.from(this.state.imageFile).map(img => {
        //     const uploadTask = storage.ref(`/images/${img.file.name}`).put(img.file);
        // });
        // const uploadTask = storage.ref(`/images/${this.state.imageFile.name}`).put(this.state.imageFile);
        //initiates the firebase side uploading 
        //     uploadTask.on('state_changed',
        //         (snapShot) => {
        //             //takes a snap shot of the process as it is happening
        //             console.log(snapShot)
        //         }, (err) => {
        //             console.log(err)
        //         }, () => {
        //             storage.ref('images').child(this.state.imageFile.name).getDownloadURL()
        //                 .then(fireBaseUrl => {
        //                     console.log('[storege ref] ' + fireBaseUrl);
        //                 })
        //         })
    }

    handleChangeChk = (event, index) => {
        console.log(event.target.name),

            this.setState(previousState => ({
                checked: {
                    ...previousState.checked,
                    [index]: !previousState.checked[index]
                }
            }));
    }

    submitPost = (event) => {
        if (!this.props.loading && !this.props.animate) {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        formData['imageFile']=this.state.imageFile;

        let postKey = new Date().getTime();
        postKey.toString();
        formData['key']=postKey;
        // const order = {
        //     ingredients: this.props.ings,
        //     price: this.props.price,
        //     orderData: formData,
        //     userId: this.props.userId
        // }
        // this.props.onOrderBurger(order, this.props.token);
                this.props.onFetchNewPost(formData)
            } else this.resetForm();
               this.props.onAnimateSuccesErrorButton();
    }

resetForm=()=>{
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
        formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
        });
    }
    let newState={};
    formElementsArray.map(formElement => (
        newState=updateObject(this.state.orderForm[formElement.id], {
            value:'',
            valid: false,
            touched: false
        })
    ))
    this.setState({orderForm:newState});
    console.log('test reseting/////',this.state.orderForm)
}
    inputChangedHandler = (event, inputIdentifier,imageList) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: !this.props.loading && this.props.animate? '': event.target.value,
            valid: !this.props.loading && this.props.animate?false:checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: !this.props.loading && this.props.animate?false:true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid,imageFile:imageList });
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let animationButton = null;
        let hidePostForm = "Show";
        if (!this.props.loading && !this.props.animate) {

            animationButton = <ButtonBootstrap
                variant="outline-dark"
                onClick={this.submitPost}
                disabled={!this.state.formIsValid}>
                   { this.state.formIsValid?"Add Post":"Fill all field"}</ButtonBootstrap>

            if (this.state.btnMessage == "Do it again?") {
                this.setState({ btnMessage: "Success" });
            }
        } else if (!this.props.loading && this.props.animate) {
            hidePostForm = "Hide";
            setTimeout(() => {
                this.setState({ btnMessage: "Do it again?" })
            }, 1000);

            animationButton = <ButtonBootstrap
                variant="success"
                onClick={this.submitPost}>{this.state.btnMessage}</ButtonBootstrap> ,
                <Button
                    btnType="Success"/>

        } else { animationButton = <label className={classes.Loading}><PropagateLoader /></label> }
        let form = (
            <form onSubmit={this.submitPost} >
                <div className={classes[hidePostForm]}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                </div>
                {/* <Button btnType="Success" disabled={!this.state.formIsValid}></Button> */}
                <Button
                    btnState={hidePostForm + 'PostForm'}
                    btnType="Success"
                   
                />
                <div className={classes.SubmitBtn}>
                    {animationButton}
                </div>
                <ImageUploading
                    onChange={this.handleImageAsFile}
                    maxNumber={maxNumber}
                    multiple
                    maxFileSize={maxMbFileSize}
                    acceptType={["jpg", "gif", "png"]}

                >
                    {({ imageList, onImageUpload, onImageRemoveAll }) => (
                        // write your building UI
                        <div className={classes.ImgDivWraper}>
                            <div className={classes.BtnWraper}>
                                <ButtonBootstrap variant="outline-primary" onClick={onImageUpload}>Upload images</ButtonBootstrap>{' '}
                                <ButtonBootstrap variant="outline-danger" onClick={onImageRemoveAll}>Remove all images</ButtonBootstrap>{' '}
                            </div>
                            {console.log(imageList.length)}
                            {imageList.length !== 0 ?
                                <div className={classes.PreloaderWraper}>
                                    {imageList.map((image, index) => (
                                        < div key={image.key}
                                            className={classes.ImgDiv}>
                                            <img src={image.dataURL} />
                                            <input
                                                ref={ref => this.fileInput = ref}
                                                key={index}
                                                type="checkbox"
                                                name={image.file.name}
                                                value={image.dataURL}
                                                checked={checked[index] || false}
                                                disabled={!checked[index] && disabled}
                                                onChange={(event) => this.handleChangeChk(event, index)}
                                            />                                            <ButtonBootstrap variant="outline-info" onClick={image.onUpdate}>
                                                <svg className="bi bi-arrow-clockwise" width="0.9em" height="0.9em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z" />
                                                    <path fillRule="evenodd" d="M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </ButtonBootstrap>

                                            <ButtonBootstrap variant="outline-danger" onClick={image.onRemove}>
                                                <svg className="bi bi-trash" width="0.8em" height="0.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>

                                            </ButtonBootstrap>
                                        </div>
                                    ))}
                                </div> : null}
                        </div>
                    )}
                </ImageUploading>
            </form>
        );

        /////////////
        const { checked } = this.state;
        const checkedCount = Object.keys(checked).filter(key => checked[key]).length;
        const disabled = checkedCount > 0;
        let year = [];
        for (let i = 1960; i <= 2060; i++) {
            year.push(<option key={i} value={i}>{i}</option>);
        }




        console.log('[this.props.animate] -> ' + this.props.animate);
       


        return (
            <div className={classes.NewPost}>
     
                <div className={classes[hidePostForm]}>
                    {/* <h1>Add a Post</h1>
                    <label>Architects</label>
                    <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                        <option key='1' value="0" >Select Author</option>
                        <option key='2' value="Cichocka">Cichocka</option>
                        <option key='3' value="Manu">Manu</option>
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
{/* 
                    <label>Year</label>
                    <select value={this.state.year} onChange={(event) => this.setState({ year: event.target.value })}>
                        {year}
                    </select>
                    <label>Content</label>
                    <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                    <br />  */}
                </div>
                {form}
               
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
        onFetchNewPost: (formData) => dispatch(actions.addNewPost(formData)),
        onAnimateSuccesErrorButton: () => dispatch(actions.animateSuccesErrorButton())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);