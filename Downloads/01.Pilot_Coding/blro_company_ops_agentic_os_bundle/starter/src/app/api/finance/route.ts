import { NextResponse } from "next/server"; import { finance } from "@/server/mock-data"; export async function GET(){return NextResponse.json({ok:true,data:finance,error:null})}
