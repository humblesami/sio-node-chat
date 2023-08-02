var request = require('request');

const api_calls = {
    server_url : '',
    set_server_url: function(host_url){
        this.server_url = host_url;
    },
    post_request : function(postData, api_path, headers, host_url){
        var clientServerOptions = {
            uri: host_url || api_calls.server_url + api_path,
            body: JSON.stringify(postData),
            method: 'POST',
        }
        clientServerOptions.headers = headers || {};
        clientServerOptions.headers['Content-Type'] = 'application/json';
        request(clientServerOptions, function (error, response) {
            console.log(error, response.body);
            return;
        });
    }
}

module.exports = api_calls;
