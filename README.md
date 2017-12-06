# SCEPTER-UserService

Creates a user and stores the user in DynamoDB.

## Post Data Example

    { 
      "username": "uniqueUser", 
      "roles": ["SOME_ROLE"], 
      "plainPassword": "willbehashed" 
    }

