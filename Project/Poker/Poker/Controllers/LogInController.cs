﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Poker.Models;
using Business;

namespace Poker.Controllers
{
    public class LogInController : Controller
    {
        // GET: LogIn
        public ActionResult LogIn()
        {
            LogInModel model = new LogInModel();
            return View(model);
        }
        [HttpPost]
        public ActionResult LogIn(LogInModel lg)
        {
            try
            {
                UserRepository u = new UserRepository();
                if (ModelState.IsValid && u.IsMatch(lg.username, lg.password))
                {
                    Session["username"] = u.ReadByUsername(lg.username).username;
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.BadLogin = true;
                    return View(lg);
                }
            }
            catch (Exception e)
            {
                return View("ErrorPage", e);
            }
        }
        public ActionResult SignUp()
        {
            LogInModel m = new LogInModel();
            return View(m);
        }
        [HttpPost]
        public ActionResult SignUp(LogInModel model)
        {
            UserRepository u = new UserRepository();
            if (u.IsTaken(model.username))
            {
                ViewBag.returnString = "Username taken";
                return View("SignUp");
            }
            else
            {
                u.Register(model.username, model.password,model.avatarURL);
                var temp = u.ReadByUsername(model.username);
                Session["username"] = temp.username;
                return RedirectToAction("Index", "Home");
            }
        }
        public ActionResult LogOut()
        {
            Session["username"] = "";
            return RedirectToAction("LogIn");
        }
    }
}