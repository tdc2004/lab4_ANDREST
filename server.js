const express = require('express');
const mongoose = require('mongoose');

const uri = "mongodb+srv://chinhtdph40493:chinh123@cluster0.f5kzsvz.mongodb.net/MD18309"

const app = express();
const FruitModel = require('./models/fruit');
const DistributorModel = require('./models/distributor');
app.use(express.json());

// day danh sach len
app.listen(3000, () => {
    console.log("Server chay cong 3000");
})
mongoose.connect(uri).then(() => console.log("Connect thanh cong"))

app.post('/addDistributor', async (req, res) => {
    try {
        const distributorData = req.body;
        const distributorNew = await DistributorModel.create(distributorData);
        console.log(distributorNew);
        const distributors = await DistributorModel.find();
        res.send(distributors)
    } catch (error) {
        res.status(500).send(error)
    }
})
app.get('/listdis', async (req, res) => {
    let distributor = await DistributorModel.find();
    console.log(distributor);
    res.send(distributor);
})

app.get('/list', async (req, res) => {
    let fruits = await FruitModel.find();
    console.log(fruits);
    res.send(fruits)
})

app.post('/add', async (req, res) => {
    try {
        const fruitData = req.body; // lay du lieu fruit tu yeu cau body

        const newFruit = await FruitModel.create(fruitData);
        console.log(newFruit);
        const fruits = await FruitModel.find();
        res.send(fruits)
    } catch (error) {
        res.status(500).send(error);
    }
})
app.put('/list/:id', async (req, res) => {
    try {
        const fruit = await FruitModel.findById(req.params.id);
        await fruit.updateOne({ '$set': req.body });
        res.status(200).json("Sua thanh cong")
    } catch (error) {
        res.status(500).json(err)
    }
})
app.delete('/list/:id', async (req, res) => {
    try {
        const fruitId = req.params.id;
        console.log(fruitId);
        const deleteFruit = await FruitModel.findByIdAndDelete(fruitId);
        res.status(200).json("Xoa thanh cong")
    } catch (error) {
        res.status(500).json(err)
    }
})

// upload anh
const upload = require('./upload');
app.post("/addImage", upload.array("image", 5), async (req, res) => {
    try {

        const data = req.body;
        const files = req.files;
        const urlsImage = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        const newFruit = new FruitModel({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: urlsImage,
            description: data.description,
            id_distributor: data.id_distributor,
        })
        const result = await newFruit.save();
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Them thanh cong",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Them that bai",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})


//email
// const Users = require('./models/user');
// const Transporter = require('./mail');

// app.post('/register_post', upload.single('avatar'), async (req, res) => {
//     try {
//         const data = req.body;
//         const file = req.file;

//         // Kiểm tra xem đã tải lên avatar hay chưa và tạo đường dẫn URL tương ứng
//         let avatarUrl = "";
//         if (file) {
//             avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
//         }

//         const newUser = new Users({
//             fullName: data.fullName,
//             email: data.email,
//             passWord: data.passWord,
//             phone: data.phone,
//             address: data.address,
//             avatar: avatarUrl
//         });

//         const result = await newUser.save();
//         if (result) {
//             const mailOptions = {
//                 from: "quynhlmph32353@fpt.edu.vn",
//                 to: result.email,
//                 subject: "Đăng ký thành công",
//                 text: "Cảm ơn bạn đã đăng ký"
//             };
//             await Transporter.sendMail(mailOptions); // gửi mail 

//             return res.status(200).json({
//                 status: 200,
//                 message: "Thêm thành công",
//                 data: result
//             });
//         } else {
//             return res.status(400).json({
//                 status: 400,
//                 message: "Lỗi, thêm không thành công",
//                 data: []
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             status: 500,
//             message: "Đã xảy ra lỗi khi xử lý yêu cầu",
//             data: null
//         });
//     }
// });
