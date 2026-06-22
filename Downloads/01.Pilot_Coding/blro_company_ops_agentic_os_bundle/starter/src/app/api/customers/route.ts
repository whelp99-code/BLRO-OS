import { NextResponse } from "next/server"; import { customers } from "@/server/mock-data"; export async function GET(){return NextResponse.json({ok:true,data:customers,error:null})}
