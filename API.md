<h1>API DOCUMENTATION</h1>

<span>
The Emporio Analytics assignment API is organised around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes authentication.
</span>

<br/>

<h3>POST - <span>/user/signup</span></h3>  

    {
        username: String,
        email: String,
        password: String,
    }

<h3>Return JSON-encoded</h3>

    {
        token : String
    }

<br/>

<h3>POST - <span>/user/login</span></h3>  

    {
        email: String,
        password: String,
    }

<h3>Return JSON-encoded</h3>

    {
        token : String
    }

description

<br/>

<h3>GET - <span>/user/logout</span></h3>  

Retrieve all the makes from the inventory list

<br/>

<h3>GET - <span>/user/me</span></h3>  

<h3>Return JSON-encoded</h3>

    {
      id: string,
      username: string,
      email: string,
    }

<br/>

