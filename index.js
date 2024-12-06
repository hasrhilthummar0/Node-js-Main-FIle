const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv')

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./database/db');
app.use(express.static('public'));

// ------------------ Storage -----------------

const multer = require('multer');
const path = require("path");
app.use(express.static("public"));
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "C:\Users\Harshil Thumar\Desktop\E-commerce\MVC\public\image"), function (err) {
//             if (err) {
//                 throw err;
//             }
//         })
//     },
//     filename: function (req, file, cb) {
//         const name = Date.now() + '-' + file.originalname;
//         cb(null, name, function (err) {
//             if (err) {
//                 throw err;
//             }
//         })
//     }
// })


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set destination folder for images
        cb(null, path.join(__dirname, './'));  // 'uploads' folder should exist in your project directory
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded image
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});


const upload = multer({ storage: storage })




// ---------------------catogory api-------------------------

const { CatogoryData, deleteData, getData, UpdateData } = require('./controller/catogorycontroller');
app.post('/adddata', CatogoryData);
app.delete('/delete/:id', deleteData);
app.get('/getdata', getData);
app.put('/updatedata/:id', UpdateData)


// ----------------subcatogry api -----------------------

const { insertData, getDatah, updateDataA, DeleteDataa } = require('./controller/subcatogory');
app.post('/insertdata', insertData);
app.get('/getdata', getDatah);
app.put('/updatesub/:id', updateDataA);
app.delete('/deleteData/:id', DeleteDataa);

// ----------------- product Api -------------------------

const { sendEmail, AddProductData, getProduct } = require('./controller/productController');
app.post('/productinsert', upload.array("image"), AddProductData);
app.get('/productget', getProduct);
// app.get('/getproduct', Getdata);
// app.get('/searchproduct', searchproduct);
// app.put('/productupdate/:id', updateData);
// app.delete('productDelete/:id', DeleteData);
// app.post('/productdata', createProduct);

app.get('/harshil', sendEmail);

// --------------------user Api -----------------------------

// const { userCreate, loginUser, searchUser, harshilEmail } = require('./controller/usercontroller');
// const { verifyToken } = require('./middleware/user');
// // const { error, log } = require("console");
// app.post('/insertuser', userCreate);
// app.post('/loginuser', loginUser);
// app.get('/dataharshil', searchUser)
// // app.get('/data', verifyToken, getData1);
// app.get("/sendmail", harshilEmail);


const { harshilEmail, userCreate, SubmitOtp, ResetPassword, loginUser, updateData } = require('./controller/usercontroller');
app.get('/sendemaill', harshilEmail);
app.post('/userdata', userCreate)
app.post('/submit-otp', SubmitOtp);
app.post('/resetpassword', ResetPassword);
app.post('/loginuser', loginUser)
app.put('/updateData/:id', updateData)


// ----------------------------------- address model -----------------------------------

const { createData, addressGet } = require('./controller/addressController');
app.post('/insertaddress', createData)
app.get('/getaddress', addressGet)

//------------------------------------admin model -------------------------------------------

const { addAdmin, getAdmin, updateAdmin, adminDelete } = require('./controller/admincontroller');
app.post('/addadmin', addAdmin);
app.get('/getadmin', getAdmin);
app.put('/updateadmin/:id', updateAdmin);
app.delete('/deleteadmin/:id', adminDelete);




//------------------------------------- color model --------------------------------------------

const { addColor, getColor, updateColor, deleteColor } = require('./controller/colorcontroller');
app.post('/addcolordetails', addColor);
app.get('/getcolordetails', getColor);
app.put('/updatecolor/:id', updateColor);
app.delete('/deletecolor/:id', deleteColor);


//-------------------------------------size model ------------------------------------------------

const { addSizeinfo, getSize, updateSize, deleteSize } = require('./controller/sizecontroller');
app.post('/addsize', addSizeinfo);
app.get('/getsize', getSize);
app.put('/updatesize/:id', updateSize);
app.delete('/deletesize/:id', deleteSize);


//--------------------------------------review model ----------------------------------------------

const { getReview, dataGet, updateReview, deleteReview } = require('./controller/recieewmodel');
app.post('/insertreview', getReview);
app.get('/getreview', dataGet);
app.put('/upatereview/:id', updateReview);
app.delete('/deletereview/:id', deleteReview)

// -------------------------------------user contact ------------------------------------------------

const { addUser, getUser, updateUser, deleteUser } = require('./controller/userdetail');
app.post('/addUser', addUser);
app.get('/getUser', getUser);
app.put('/updateuser/:id', updateUser);
app.delete('/deleteuser/:id', deleteUser);
// ------------- app listen -----------------------

// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
    console.log(`sever is running on ${process.env.PORT}`);
});

