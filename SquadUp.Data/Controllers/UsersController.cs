using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace SquadUp.Data.Controllers
{
    public class UsersController : ApiController
    {
        private SportsMeetupDBEntities db = new SportsMeetupDBEntities();

        [Route("api/Login")]
        [HttpGet]
        public User Login(string Username, string Password)
        {
            db.Database.Connection.Open();
            return db.Users.Where(x => x.FirstName == Username && x.Password == Password).FirstOrDefault();
        }

        [Route("api/AddFriend")]
        [HttpPost]
        public void AddFriend(int UserId, int FriendId)
        {
            db.Database.Connection.Open();
            //if they aren't already friends
            if(db.Friends.Where(x => (x.UserID == UserId && x.FriendID == FriendId) || (x.UserID == FriendId && x.FriendID == UserId)).Count() == 0)
            {
                var Friend = db.Friends.Create();
                Friend.FriendID = FriendId;
                Friend.UserID = UserId;
                db.Friends.Add(Friend);
                db.SaveChanges();
            }
        }

        [Route("api/GetFriends")]
        [HttpGet]
        public IEnumerable<Friend> GetFriendsList(int UserId)
        {
            db.Database.Connection.Open();
            return db.Friends
                .Include("User")
                .Where(x => x.FriendID == UserId || x.UserID == UserId)
                .ToList();
        }

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.ID)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.ID }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.ID == id) > 0;
        }
    }
}