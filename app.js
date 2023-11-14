const express = require('express')
const app = express()
const expressError = require('./expressError')


app.get('/mean', function(req, res, next) {
    const numsParam = req.query.nums;

    if (!numsParam) {
        return next(new expressError('nums are required.', 400));
    }

    const nums = numsParam.split(',').map(Number);

    if (nums.some(isNaN)) {
        const invalidNum = nums.find(isNaN);
        return next(new expressError(`${invalidNum.value} is not a number.`, 400));
    }
    const total = nums.reduce((acc, num) => acc + num, 0);
    const mean = total / nums.length;

    res.send(`Mean: ${mean}`);
});



app.get('/median', function(req, res, next){
    const numsParam = req.query.nums;

    if (!numsParam) {
        return next(new expressError('nums are required.',400));
    }

    const nums = numsParam.split(',').map(Number);

    if (nums.some(isNaN)) {
        const invalidNum = nums.find(isNaN);
        return next(new expressError(`${invalidNum} is not a number.`, 400));
    }

    const median = nums[(nums.length-1)/2];

    res.send(`Median: ${median}`);
    
});


app.get('/mode', function(req, res, next) {
    const numsParam = req.query.nums;

    if (!numsParam) {
        return next(new ExpressError('nums are required.', 400));
    }

    const nums = numsParam.split(',').map(Number);

    if (nums.some(isNaN)) {
        const invalidNum = nums.find(isNaN);
        return next(new ExpressError(`${invalidNum} is not a number.`, 400));
    }

    const mode = findMode(nums);

    res.send(`Mode: ${mode}`);
});




app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Something went wrong!');
});

app.listen(3000, function(){
    console.log("Server running on port 3000")
});


