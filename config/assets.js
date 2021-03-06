'use strict';

/** Must add all client dependencies here. **/
/** Order listed is important. **/
module.exports = {

    all: {
        vendor: {
            js: {
                socketio: '/socket.io/socket.io.js',
                angular: 'lib/angular/angular.js',
                angular_resource: 'lib/angular-resource/angular-resource.js',
                angular_animate: 'lib/angular-animate/angular-animate.js',
                angular_bootstrap: 'lib/angular-bootstrap/ui-bootstrap.js',
                angular_sanitize: 'lib/angular-sanitize/angular-sanitize.js'
            },
            css: {

            }
        },
        js: {
            application: ['config.js', 'application.js'],
            modules: ['modules/*.js', 'modules/*/*.js', 'modules/*/*[!tests]*/*.js']
        },
        css: {
            main: 'res/styles/main.css'
        },
        tests: {
            modules: 'modules/*/tests/*.js'
        }
    },

    develop: {

    },

    release: {
        vendor: {
            js: {
                angular: 'lib/angular/angular.min.js',
                angular_resource: 'lib/angular-resource/angular-resource.min.js',
                angular_animate: 'lib/angular-animate/angular-animate.min.js',
                angular_bootstrap: 'lib/angular-bootstrap/ui-bootstrap.min.js',
                angular_sanitize: 'lib/angular-sanitize/angular-sanitize.min.js'
            }
        }
    }
};