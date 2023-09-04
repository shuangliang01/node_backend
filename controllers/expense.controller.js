import Expense from '../models/expense.model';
import {secretKey} from "./user.auth.controller";
const randomWord = require('random-word');
const jwt = require('jsonwebtoken');

const createExpense = () => {
    return {
        title: randomWord(),
        amount: Math.floor(Math.random() * 100000),
        status: Math.floor(Math.random() * 2),
        description: randomWord(),
        username: randomWord(),
    };
};

const saveImageData = () =>{
    for (let i = 0; i <= 30; i++) {
        const newExpense = new Expense(createExpense());
        newExpense.save().then((expense) => {}).catch(e => "Invalid Request");
    }
}


export const getList = (req, res) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided'})
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token '})
        }
        req.user = decoded;
        Expense.find({}).then((expenses) => {
            if (expenses.length > 0) {
                return res.json({ status: 200, message: 'Fetched expenses list successfully.', expenses: expenses });
            } else {
                const saveError = saveImageData();
                if(saveError){
                    return res.json({ status: 400, message: 'Invalid Request!' });
                }
            }
        }).catch(e => res.json({ status: 400, message: 'Invalid Request!' }));
    })
}

export const getFilerList = (req,res) => {
    let flag =  req.body.flag;
    let startprice = req.body.startprice;
    let endprice = req.body.endprice;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let query = '';
    if(flag == "price") {
        query = { amount: { $gt: startprice, $lt: endprice } };
    }else{
        query = { createdAt: { $gt: startdate+"T00:00:00.000Z", $lt: enddate+"T00:00:00.000Z" } };
    }

    Expense.find( query ).then(expenses => {
        if (expenses.length > 0) {
            return res.json({ status: 200, message: 'Fetched expenses list successfully.', expenses: expenses });
        } else {
            const saveError = saveImageData();
            if(saveError){
                return res.json({ status: 400, message: 'Invalid Request!' });
            }
        }
    }).catch(e => {
        res.json({ status: 400, message: 'Invalid Request!' })
        }
    );
    
}







