import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import ListItem from "./ListItem";
import { useMutation, useQuery } from "@tanstack/react-query";

// Styled Components
const HomeContainer = styled.div`
   width: 100%;
   padding: 1rem;
   box-sizing: border-box;
   /* border: 1px solid #fff; */
`;
const FormSearch = styled.form`
   width: 100%;
   margin: 4rem 0 2rem 0;
   position: relative;
   z-index: 80;
`;
const LabelSearch = styled.label`
   display: none;
   font-size: 20px;
   margin-right: 15px;
`;
const InputSearch = styled.input`
   width: 100%;
   padding: 15px 0;
   padding-left: 30px;
   font-size: 16px;
   border: 2px solid #18d382;
   border-radius: 30px;
   box-sizing: border-box;
   &::placeholder {
      color: #18d382;
   }
`;
const SearchBtn = styled.button`
   position: absolute;
   right: 0;
   top: 0;
   z-index: 90;
   background-color: #18d382;
   width: 100px;
   height: 52px;
   border-radius: 30px;
   font-size: 20px;
   font-weight: bold;
   margin-left: 15px;
`;

// Types
interface HeadData {
   list_total_count?: string;
   RESULT?: {
      CODE: string;
      MESSAGE: string;
   };
   api_version?: string;
}
interface ParamTypes {
   KEY: string;
   Type: string;
   pIndex: string;
   pSize: string;
   SIGUN_NM: string;
}
// interface ResponseData {
//    PlaceThatDoATasteyFoodSt: {
//       head: HeadData[];
//       row: {
//          REFINE_LOTNO_ADDR?: string;
//          REFINE_ROADNM_ADDR?: string;
//          REFINE_WGS84_LAT?: string;
//          REFINE_WGS84_LOGT?: string;
//          REFINE_ZIP_CD?: string;
//          REPRSNT_FOOD_NM?: string;
//          RESTRT_NM?: string;
//          RM_MATR?: null;
//          SIGUN_CD?: string;
//          SIGUN_NM?: string;
//          TASTFDPLC_TELNO?: string;
//       }[];
//    };
// }

const Home = () => {
   const [text, setText] = useState<string>("");
   const [headData, setHeadData] = useState<HeadData[]>([]); // 헤더 정보
   const [rowList, setRowList] = useState<never[]>([]); // 불러온 목록
   const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setText(value);
   };

   // React-Query
   // GET
   const getData = async (): Promise<void> => {
      const params: ParamTypes = {
         KEY: "1fa67d81d0db4d32bbd263f5a3cc05af",
         Type: "json",
         pIndex: "1",
         pSize: "10",
         SIGUN_NM: "",
      };
      const response = await fetch(`https://openapi.gg.go.kr/PlaceThatDoATasteyFoodSt?KEY=${params.KEY}&Type=${params.Type}&pIndex=${params.pIndex}&pSize=${params.pSize}&SIGUN_NM=${params.SIGUN_NM}`);
      const result = await response.json();
      setHeadData(result.PlaceThatDoATasteyFoodSt[0].head);
      setRowList(result.PlaceThatDoATasteyFoodSt[1].row);
      return result;
   };
   useQuery({
      queryKey: ["getData"],
      queryFn: getData,
      // select: (data) => console.log(data),
      refetchOnWindowFocus: false,
   });
   // POST
   const postData = async (data: ParamTypes): Promise<void> => {
      // console.log(data);
      const response = await fetch(`https://openapi.gg.go.kr/PlaceThatDoATasteyFoodSt?KEY=${data.KEY}&Type=${data.Type}&pIndex=${data.pIndex}&pSize=${data.pSize}&SIGUN_NM=${data.SIGUN_NM}`);
      const result = await response.json();
      setHeadData(result.PlaceThatDoATasteyFoodSt[0].head);
      setRowList(result.PlaceThatDoATasteyFoodSt[1].row);
      return result;
   };
   const postMutate = useMutation({
      mutationKey: ["postData"],
      mutationFn: postData,
   });
   // Submit Func
   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (text.length < 3) {
         alert("'OO시'가 되도록 입력해야 합니다.");
      } else {
         const mutateParams: ParamTypes = {
            KEY: "1fa67d81d0db4d32bbd263f5a3cc05af",
            Type: "json",
            pIndex: "1",
            pSize: "10",
            SIGUN_NM: text,
         };
         postMutate.mutate(mutateParams);
      }
   };

   return (
      <>
         <Sidebar />
         <HomeContainer>
            <h1 style={{ color: "#18d382" }}>Spoon</h1>
            <FormSearch onSubmit={onSubmit}>
               <LabelSearch htmlFor="search">검색창</LabelSearch>
               <InputSearch
                  id="search"
                  type="text"
                  value={text}
                  onChange={onChangeText}
                  placeholder="검색어를 입력하세요"
               />
               <SearchBtn type="submit">검색</SearchBtn>
            </FormSearch>
            <span>총 {headData[0]?.list_total_count ?? 0} 개의 맛집을 불러왔습니다.</span>
            <ListItem rowList={rowList} />
         </HomeContainer>
      </>
   );
};

export default Home;