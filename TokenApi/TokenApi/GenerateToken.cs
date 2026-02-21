using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TokenApi
{
    public class GenerateToken
    {
        public string Token(string userName, int userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes("a-string-secret-at-least-256-bits-long");

            var claimLsit = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Name, userName),
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString())
            };

            var tokenDescription = new SecurityTokenDescriptor
            {
                Audience = "auth-client",
                Issuer = "auth-api",
                Subject = new ClaimsIdentity(claimLsit),
                Expires = DateTime.Now.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}
