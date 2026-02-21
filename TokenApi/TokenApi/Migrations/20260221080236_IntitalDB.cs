using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace TokenApi.Migrations
{
    /// <inheritdoc />
    public partial class IntitalDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    username = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: true, defaultValueSql: "'NULL'"),
                    email = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, defaultValueSql: "'NULL'"),
                    password = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true, defaultValueSql: "'NULL'"),
                    salt = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true, defaultValueSql: "'NULL'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
