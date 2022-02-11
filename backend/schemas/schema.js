
import createSchema from 'part:@sanity/base/schema-creator'


import schemaTypes from 'all:part:@sanity/base/schema-type'


import user from './user';
import like from './like';
import comment from './comment';
import pin from './pin';
import postedBy from './postedby';



export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    user,pin,comment,like,postedBy
  ]),
})
