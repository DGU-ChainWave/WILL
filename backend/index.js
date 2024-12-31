const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5005;

// const adminRoute = require("./admin/admin");
const authRoute = require('./routes/auth');
const mypageRoute = require('./routes/mypage');
const ipfsRoute = require('./routes/ipfs');

dotenv.config();
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));

app.use(
  cors({
    origin: 'http://localhost:3000', // 허락하고자 하는 요청 주소
    credentials: true,
  }),
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// app.use("/admin", adminRoute);
app.use('/api/auth', authRoute);
app.use('/api/mypage', mypageRoute);
app.use('/api/ipfs', ipfsRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
