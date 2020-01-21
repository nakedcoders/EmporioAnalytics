db.createUser(
    {
        user: "admin",
        pwd: "secret",
        roles:[
            {
                role: "readWrite",
                db:   "Emporio"
            }
        ]
    }
);

// mongo -u admin -p password --authenticationDatabase mydatabase