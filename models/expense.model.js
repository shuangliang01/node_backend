import mongoose from 'mongoose';

let ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  status: Number,
  description: String,
  username: String,
},
{
  timestamps: true
});

export default mongoose.model('Expense', ExpenseSchema);
