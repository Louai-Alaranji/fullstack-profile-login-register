using LoginApp.IdenttiyClasses;
using LoginApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LoginApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<MyUser> userManager;
        private readonly SignInManager<MyUser> signInManager;

        public UserController(UserManager<MyUser> userManager, SignInManager<MyUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("add-user")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new MyUser()
            {
                Fullname = model.Fullname,
                Email = model.Email,
                Contact = model.Contact,
                Address = model.Address,
                UserName = model.Email,
                PasswordHash = model.Password
            };
            var result = await userManager.CreateAsync(user, user.PasswordHash!);
            if (result.Succeeded)
            {
                return Ok("Registration was successful!");
            }
            return BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (string.IsNullOrEmpty(model.email) || string.IsNullOrEmpty(model.password))
            {
                return BadRequest("Email and password are required.");
            }

            var signInResult = await signInManager.PasswordSignInAsync(
                userName: model.email,
                password: model.password,
                isPersistent: false,
                lockoutOnFailure: false
            );

            if (signInResult.Succeeded)
            {
                return Ok("You are signed in!");
            }
            else if (signInResult.IsLockedOut)
            {
                return BadRequest("Your account is locked out.");
            }
            else
            {
                return BadRequest("Invalid email or password.");
            }
        }

        [HttpGet("get-fullname")]
        public async Task<IActionResult> GetFullname(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null) 
            {return BadRequest("user does not exist");}
            else { return Ok(user.Fullname); }
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteItem(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                await userManager.DeleteAsync(user);
                return Ok();
            }
        }
    }
}
