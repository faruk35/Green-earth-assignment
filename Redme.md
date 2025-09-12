1) What is the difference between var, let, and const?

    Ans: var - পুরানো, ফাংশন স্কোপ, রিডিক্লেয়ার করা যায়। 
        let -  নতুন, block scope, re-declare করা যায়, value বদলানো যায় না। 
        const - block scope, re-declare করা যায় না। 

2) What is the difference between map(), forEach(), and filter()?
    Ans: forEach - শুধু লুপ চালায়, নতুন array দেয় না।
        map - লুপ চালিয়ে নতুন array দেয়। 
        filter - শর্ত মেনে যেগুলো সত্য হয় সেগুলো নিয়ে নতুন array দেয়। 
3) What are arrow functions in ES6?
    Ans: এরু ফাংশন হল ছোট করে ফাংশন লেখার উপায়। 
        function myFunction () {

        }
        এই ফাংশনকে এভাবে লেখা যায় 
        let myFunction = () => {

        }
        তবে এতে this আলাদা বিহেভ করে। সে পেরেন্ট থেকে নেয়। 
4) How does destructuring assignment work in ES6?
    Ans: এটি দিয়ে Array/object থেকে মান সরাসরি ভ্যারিয়েবল থেকে নেওয়া যায়। 
    যেমন ঃ 
            let [a,b] = [10, 20]
            let {a, b} = {name : 'Steve', age: 23}

5) Explain template literals in ES6. How are they different from string concatenation?
    Ans: এটি ব্যাক্টিক (``) দিয়ে লেখা হয়। 
        এর ভেতরে অর্থাৎ `` এর ভেতর ${} দিয়ে সরাসরি মান দেয়া যায় বা ব্যবহার করা যায়।       
        আগে করতে হত "steve " + name, এখন = steve ${name}। 