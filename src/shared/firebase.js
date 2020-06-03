
        
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';

        const firebaseConfig = {
            apiKey: "AIzaSyBot6sPtRy9jVw92sVBevsTiL0vHCJzReg",
            authDomain: "cichocka-c6fc5.firebaseapp.com",
            databaseURL: "https://cichocka-c6fc5.firebaseio.com",
            projectId: "cichocka-c6fc5",
            storageBucket: "cichocka-c6fc5.appspot.com",
            messagingSenderId: "874982592562",
            appId: "1:874982592562:web:45166de12b61cc2323ec2b",
            measurementId: "G-1458J9ZZ5P"
        };


        firebase.initializeApp(firebaseConfig);
        const storage = firebase.storage();
        // const storageRef = storage.ref();
        // const imagesRef = storageRef.child('images');
        // const fetchPath = [];
        // const fetchFullPath = [];

        export  {
            storage, firebase as default
          }
         