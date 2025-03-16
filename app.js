const express = require('express');
const pool = require('./db');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.listen(3000, () => {
  console.log('Server listening on port 3000')
});

app.get('/', (req, res) => {
  pool.query('SELECT * FROM todos',(error,results) =>{
    if (error) throw new error;
  res.render('top.ejs',{items:results.rows});
  })
});

app.post('/create',(req,res) =>{
  pool.query('INSERT INTO todos (title) VALUES ($1)',
    [req.body.title],
    (error,results) =>{
  res.redirect('/');
})
});

app.post('/delete/:id',(req,res) =>{
  pool.query('DELETE FROM todos WHERE id=$1',
    [req.params.id],
    (error,results) =>{
      res.redirect('/')
    }
  )
})

app.get('/edit/:id',(req,res) =>{
  pool.query('SELECT * FROM todos WHERE id=$1',
    [req.params.id],
    (error,results) =>{
      res.render('edit.ejs',{item:results.rows[0]})
    }
  )
})
 
app.post('/update/:id',(req,res) =>{
  pool.query('UPDATE todos SET title=$1 WHERE id=$2',
    [req.body.title,req.params.id],
    (error,results) =>{
      res.redirect('/')
    }
  )
})