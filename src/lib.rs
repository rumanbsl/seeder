#[macro_use]
extern crate seed;
mod tailwind;
use seed::prelude::*;
use tailwind::C as TW;
#[derive(Debug, Default)]
struct Model {
    count: i32,
    what_we_count: String,
}

// Update

#[derive(Clone)]
enum Msg {
    Increment,
    Decrement,
    ChangeWWC(String),
}

/// How we update the model
fn update(msg: Msg, model: &mut Model, _orders: &mut impl Orders<Msg>) {
    match msg {
        Msg::Increment => model.count += 1,
        Msg::Decrement => model.count -= 1,
        Msg::ChangeWWC(what_we_count) => model.what_we_count = what_we_count,
    }
}

// View

/// A simple component.
fn success_level(clicks: i32) -> Node<Msg> {
    let descrip = match clicks {
        0..=5 => "Not very many 🙁",
        6..=9 => "I got my first real six-string 😐",
        10..=11 => "Spinal Tap 🙂",
        _ => "Double pendulum 🙃",
    };
    p![descrip]
}

/// The top-level component we pass to the virtual dom.
fn view(model: &Model) -> impl View<Msg> {
    let plural = if model.count == 1 { "" } else { "s" };

    // Attrs, Style, Events, and children may be defined separately.
    let outer_style = style! {
            St::Display => "flex";
            St::FlexDirection => "column";
            St::TextAlign => "center"
    };

    div![
        outer_style,
        h1!["The Grand Total", class![TW.text_4xl]],
        div![
            style! {
                // Example of conditional logic in a style.
                St::Color => if model.count > 4 {"purple"} else {"gray"};
                St::Border => "2px solid #004422";
                St::Padding => unit!(20, px);
            },
            // We can use normal Rust code and comments in the view.
            h3![format!(
                "{} {}{} so far",
                model.count, model.what_we_count, plural
            )],
            button![simple_ev(Ev::Click, Msg::Increment), "+"],
            button![simple_ev(Ev::Click, Msg::Decrement), "-"],
            // Optionally-displaying an element
            if model.count >= 10 {
                div![
                    h2![style! {St::Padding => px(50)}, "Nice!"],
                    img![attrs!["src" => "/earth.jpg"]]
                ]
            } else {
                empty![]
            }
        ],
        success_level(model.count), // Incorporating a separate component
        h3!["What are we counting!!"],
        input![
            attrs! {At::Value => model.what_we_count},
            input_ev(Ev::Input, Msg::ChangeWWC)
        ]
    ]
}
fn initialize(_: Url, _: &mut impl Orders<Msg>) -> seed::prelude::Init<Model> {
    Init::new(Model::default())
}

#[wasm_bindgen(start)]
pub fn render() {
    seed::App::build(initialize, update, view).build_and_start();
}
