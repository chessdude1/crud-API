import { server } from '../index'
// import * as assert from 'assert'
// import * as chaiHttp from 'chai-http';
// import * as chai from 'chai'
import * as request from 'supertest'


describe('server', function () {
  // before(function () {
  //   server.listen(3000);
  // });

  // after(function () {
  //   server.close();
  // });

  // it('should get user by id', (done) => {
  //   console.log(server)

  //   chai
  //     .request(server)
  //     .get('http://localhost:3000/api/users')
  //     .end((err, res) => {
  //       chai.expect(err).to.be.null
  //       chai.expect(res).to.have.status(200)
  //       chai.expect(res.body.data).to.equal([])

  //       done()
  //     })
  // })

  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const res = await request(server).get('/api/users')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([])
  })

});