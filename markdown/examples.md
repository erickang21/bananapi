# Python

```py
# EXAMPLE USING /api/trumptweet
# MAKE SURE TO VIEW THE PROPER PARAMS FOR OTHER ENDPOINTS!

# Using aiohttp (async requests)
import aiohttp

# Create session
session = aiohttp.ClientSession()

headers = {
    "Authorization": "Your long token here" # Replace with your actual token that you received.
}

params = {
    "text": "Some dank text that hopefully goes along well with the meme." # Self-explanatory.
}

res = await session.get("https://bananapi.ml/api/trumptweet", headers=headers, params=params) # do the request

res = await res.read() # Get the buffer

# res now contains the buffer.
```

# JavaScript

```js
const ladybug = require("ladybug-fetch"); // npm install freetnt5852/ladybug-fetch
// If needed, require("superagent") could be used.

ladybug("https://bananapi.ml/api/trumptweet")
  .query({ text: "Hello, World!" }) // Params
  .set({ Authorization: "Your long and beautiful token"}) // Auth Header
  .then((res) => {
    const buffer = res.body;
    // do something with the buffer res.body
  })
  .catch((err) => console.error(err)); // optional catch for errors
  ```