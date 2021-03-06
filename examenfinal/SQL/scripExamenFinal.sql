USE [master]
GO
/****** Object:  Database [examenfinal]    Script Date: 8/11/2020 15:31:12 ******/
CREATE DATABASE [examenfinal]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'examenfinal', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\examenfinal.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'examenfinal_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\examenfinal_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [examenfinal] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [examenfinal].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [examenfinal] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [examenfinal] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [examenfinal] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [examenfinal] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [examenfinal] SET ARITHABORT OFF 
GO
ALTER DATABASE [examenfinal] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [examenfinal] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [examenfinal] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [examenfinal] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [examenfinal] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [examenfinal] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [examenfinal] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [examenfinal] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [examenfinal] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [examenfinal] SET  DISABLE_BROKER 
GO
ALTER DATABASE [examenfinal] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [examenfinal] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [examenfinal] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [examenfinal] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [examenfinal] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [examenfinal] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [examenfinal] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [examenfinal] SET RECOVERY FULL 
GO
ALTER DATABASE [examenfinal] SET  MULTI_USER 
GO
ALTER DATABASE [examenfinal] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [examenfinal] SET DB_CHAINING OFF 
GO
ALTER DATABASE [examenfinal] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [examenfinal] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [examenfinal] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'examenfinal', N'ON'
GO
ALTER DATABASE [examenfinal] SET QUERY_STORE = OFF
GO
USE [examenfinal]
GO
/****** Object:  Table [dbo].[pedido]    Script Date: 8/11/2020 15:31:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pedido](
	[numero] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [varchar](20) NOT NULL,
	[proveedor] [varchar](45) NOT NULL,
	[producto] [varchar](45) NOT NULL,
	[cantidad] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[producto]    Script Date: 8/11/2020 15:31:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[producto](
	[codigo] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[precio] [decimal](18, 0) NOT NULL,
	[imagen] [varchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario]    Script Date: 8/11/2020 15:31:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario](
	[idUsuario] [varchar](20) NOT NULL,
	[contraseña] [varchar](20) NOT NULL,
	[tipoUsuario] [varchar](20) NOT NULL,
UNIQUE NONCLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [examenfinal] SET  READ_WRITE 
GO
