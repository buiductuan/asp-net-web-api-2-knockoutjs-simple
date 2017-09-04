namespace BookServicesNet.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using BookServicesNet.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<BookServicesNet.Models.BookServicesNetContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BookServicesNet.Models.BookServicesNetContext context)
        {
            context.Authors.AddOrUpdate(x => x.Id,
                new Author() { Id = 1, Name = "TuanBuiDev" },
                new Author() { Id = 2, Name = "TamNguyen9z" },
                new Author() { Id = 3, Name = "Anh Hung Ban Phim" },
                new Author() { Id = 4, Name = "Super Man 999" },
                new Author() { Id = 5, Name = "Spider Man 89" }
               );

            context.Books.AddOrUpdate(x => x.Id,
                new Book() { Id = 1, Title = "The new book 1", Year = 2017, Price = 11, Genre = "Funny", AuthorId = 1 },
                new Book() { Id = 2, Title = "The new book 2", Year = 2017, Price = 81, Genre = "Funny", AuthorId = 2 },
                new Book() { Id = 3, Title = "The new book 3", Year = 2017, Price = 91, Genre = "Funny", AuthorId = 3 },
                new Book() { Id = 4, Title = "The new book 4", Year = 2017, Price = 61, Genre = "Funny", AuthorId = 4 },
                new Book() { Id = 5, Title = "The new book 5", Year = 2017, Price = 41, Genre = "Funny", AuthorId = 4 },
                new Book() { Id = 6, Title = "The new book 6", Year = 2017, Price = 51, Genre = "Funny", AuthorId = 1 },
                new Book() { Id = 7, Title = "The new book 7", Year = 2017, Price = 111, Genre = "Funny", AuthorId = 2 },
                new Book() { Id = 8, Title = "The new book 8", Year = 2017, Price = 1881, Genre = "Funny", AuthorId = 3 },
                new Book() { Id = 9, Title = "The new book 9", Year = 2017, Price = 90, Genre = "Funny", AuthorId = 4 },
                new Book() { Id = 10, Title = "The new book 10", Year = 2017, Price = 56, Genre = "Funny", AuthorId = 5 },
                new Book() { Id = 11, Title = "The new book 11", Year = 2017, Price = 69, Genre = "Funny", AuthorId = 1 }
                );
        }
    }
}
