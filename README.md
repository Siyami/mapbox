Integral GIS sample app for using Mapbox GL JS library.

Load the data found at this url:
https://apps.integralgis.com/node/integralgis/people.json

And display it on the mapbox map.

Then connect the slider and filter the data by age, and display the names of all currently visible employees.

Default filter should be 30, and should only show ages that are smaller than the current filter.

Mapbox API is found here:

https://www.mapbox.com/mapbox-gl-js/api/

General things of note:
- All stylesheets need to be referenced in app.scss, which imports them for use.
- All SASS variables are in /components/common/styles/variables.scss

To set up environment:
- Run 'npm install'

To start development:
- run 'npm start'
- navigate to http://localhost:8081
