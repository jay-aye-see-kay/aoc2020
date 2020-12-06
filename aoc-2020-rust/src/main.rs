use std::fs;

fn main() {
    let expenses = parse_input("../input/1.input.txt");

    let answer_1 = solve_part_1(expenses.clone());
    println!("answer_1: {:?}", answer_1);

    let answer_2 = solve_part_2(expenses.clone());
    println!("answer_2: {:?}", answer_2);
}

fn solve_part_1(expenses: Vec<i32>) -> i32 {
    let expenses_copy = &expenses[1..];
    let mut answer: i32 = 0;

    for e1 in expenses.iter() {
        for e2 in expenses_copy.iter() {
            if e1 + e2 == 2020 {
                answer = e1 * e2;
            }
        }
    }
    answer
}

fn solve_part_2(expenses: Vec<i32>) -> i32 {
    let expenses_copy = &expenses[1..];
    let expenses_copy_2 = &expenses[2..];
    let mut answer: i32 = 0;

    for e1 in expenses.iter() {
        for e2 in expenses_copy.iter() {
            for e3 in expenses_copy_2.iter() {
                if e1 + e2 + e3 == 2020 {
                    answer = e1 * e2 * e3;
                }
            }
        }
    }
    answer
}

fn parse_input(filename: &str) -> Vec<i32> {
    let file_content = fs::read_to_string(filename).expect("## Could not find or read file");
    let expenses: Vec<i32> = file_content
        .split("\n")
        .filter(|line| line.len() > 0)
        .map(|line| line.parse::<i32>().expect("## Input is not a num"))
        .collect();
    expenses
}
