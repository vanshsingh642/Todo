import { response } from "express";
import Todo from "../model/Todo.js";

export const addTodo = async (req,res) => {

    try {
        const newTodo = await Todo.create({
            data:req.body.data,
            createdAt:Date.now()
        });

        await newTodo.save();

        res.status(200).json(newTodo);
    } catch(error){
       return response.status(500).json(error.message);
    }
}

export const getAllTodos = async (req,res) => {
    try {

      const todos =  await Todo.find({}).sort({ 'createdAt' : -1})

        res.status(200).json(todos);
    } catch(error){
       return response.status(500).json(error.message);
    }
}

export const toggleTodoDone = async (req,res) => {
    try {

       const todoRef =  await Todo.findById(req.params.id);
        const todo = await Todo.findByIdAndUpdate(
            {_id:req.params.id},
            {done:!todoRef.done}
        )
        await todo.save();
        res.status(200).json(todo);
    } catch(error){
       return response.status(500).json(error.message);
    }
}

export const updateTodo = async (req,res) => {
    try {
         await Todo.findByIdAndUpdate(
            {_id:req.params.id},
            {data:req.body.data}
        )
        
        const todo =  await Todo.findById(req.params.id);
        
        // await todo.save();
        res.status(200).json(todo);
    } catch(error){
       return response.status(500).json(error.message);
    }
}

export const deleteTodo = async (req,res) => {
    try {
        const todo =  await Todo.findByIdAndDelete(req.params.id);
       return res.status(200).json(todo);
    } catch(error){
    //    return response.status(500).json(error.message);
    }
}