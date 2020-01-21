<h1>API DOCUMENTATION</h1>

<span>
The Emporio Analytics assignment API is organised around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes authentication.
</span>

<br/>

<h1>Authorization Header</h1>

<span>To authenticate, add an Authorization header to your API request that contains an API Key.</span>


<h3>POST - <span>/user/signup</span></h3>  


    {
        username: String,
        email: String,
        password: String,
    }


<br/>

<h3>POST - <span>/user/login</span></h3>  

    {
        email: String,
        password: String,
    }

<br/>

<h3>GET - <span>/user/logout</span></h3>  

Authenticated user can logout from the server 

<br/>

<h3>GET - <span>/user/me</span></h3>  

    {
      id: string,
      username: string,
      email: string,
    }

<br/>

