import path from 'path';

const viewDirectory = path.join(__dirname, '../views');

function homepage(request, response) {
    response.sendFile(`${viewDirectory}/index.html`);
}

export default homepage;
