
const express = require("express");
const app = express();
app.use(express.json());

// cors対策
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// prismaの読み込み
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// チャットの取得
app.get("/chats", async(_, res) => {
  try {
    const AllChat = await prisma.chat.findMany();
    res.json(AllChat)
  } catch(error) {
    res.status(500).send("つぶやきの取得に失敗しました");
  }
})

// チャット保存の処理
app.post("/chat", async(req, res) => {
  try {
    const savedData = await prisma.chat.create({data: req.body});
    res.json(savedData)
  } catch(error) {
    res.status(500).send("つぶやきの保存に失敗しました")
  }
})

// コメントの取得
app.get("/comments", async(_, res) => {
  try{
    const AllComments = await prisma.comment.findMany();
    res.json(AllComments);
  }catch(error){
    res.status(500).send("コメントの取得に失敗しました");
  }
})

// コメント保存の処理
app.post("/comment", async(req, res) => {
  try{
    const savedData = await prisma.comment.create({data: req.body });
    res.json(savedData);
  }catch(error){
    res.status(500).send("コメントの保存に失敗しました");
  }

})

//コメントの削除機能
app.delete("/comments/:id", async(req, res) => {
  console.log(req.params)
  try{
    const commentId = parseInt(req.params.id, 10);
    const deletedComment = await prisma.comment.delete({where: {id: commentId}})
    res.json(deletedComment)
  }catch(error){
    res.status(500).send("コメントの削除に失敗しました。")
  }
})


// ポート3000を使用して、読み込みができるかテストする
app.listen(3000, () => {
  console.log("listening on localhost port 3000");
})
