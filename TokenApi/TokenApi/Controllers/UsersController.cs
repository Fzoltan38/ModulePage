using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using TokenApi.Models;

namespace TokenApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        [Authorize]
        [HttpPost("register")]
        public async Task<ActionResult> Register(User user)
        {
            using (var context = new AuthdbContext())
            {
                var usr = new User
                {
                    Username = user.Username,
                    Email = user.Email,
                    Password = user.Password
                };

                await context.Users.AddAsync(usr);
                await context.SaveChangesAsync();

                return Ok();
            }

        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(string userName, string password)
        {
            GenerateToken token = new GenerateToken();
            using (var context = new AuthdbContext())
            {
                var usr = await context.Users.FirstOrDefaultAsync(usr => usr.Username == userName && usr.Password == password);

                if (usr != null)
                {
                    return Ok(new { token = token.Token(usr.Username, usr.Id) });
                }

                return BadRequest();
            }

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllUser()
        {
            using (var context = new AuthdbContext())
            {
                return Ok(await context.Users.ToListAsync());
            }

        }

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> DeleteUser(int id)
        {
            using (var context = new AuthdbContext())
            {
                var user = await context.Users.FindAsync(id);
                if (user != null)
                {
                    context.Users.Remove(user);
                    await context.SaveChangesAsync();
                    return Ok(new { message = "Sikeres törlés." });
                }
                return NotFound(new { message = "Sikertelen törlés." });
            }
        }

        [Authorize]
        [HttpGet("byid")]
        public async Task<ActionResult> GetUser(int id)
        {
            using (var context = new AuthdbContext())
            {
                var user = await context.Users.FindAsync(id);
                if (user != null)
                {
                    await context.Users.ToListAsync();
                    return Ok(new { message = "Sikeres lekérdezés.", result = user });
                }
                return NotFound(new { message = "Sikertelen lekérdezés." });
            }
        }


        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateUser(int id, User user)
        {
            using (var context = new AuthdbContext())
            {
                var extendeduser = await context.Users.FindAsync(id);
                if (user != null)
                {
                    extendeduser.Username = user.Username;
                    extendeduser.Email = user.Email;
                    extendeduser.Password = user.Password;

                    context.Users.Update(extendeduser);
                    await context.SaveChangesAsync();
                    return Ok(new { message = "Sikeres módosítás.", result = user });
                }
                return NotFound(new { message = "Sikertelen módosítás." });
            }
        }
    }
}
